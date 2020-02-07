import { every, reduce, size } from "lodash";
import { FC, useEffect, useState } from "react";
import { createHook, createStore } from "react-sweet-state";
import { useDebounce } from "react-use";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { PerformanceByLoad } from "../../api/entities/data/foreplan";
import { StateCourse } from "../../constants";
import { ICourse } from "../../interfaces";
import {
  GET_CONSISTENCY_VALUE,
  SET_CONSISTENCY_VALUE,
} from "../graphql/queries";
import { useDashboardInputState } from "../pages";
import { stringListToBooleanMap } from "../utils";
import { useUser } from "../utils/useUser";
import { useTracking } from "./Tracking";

const emptyObject = Object.freeze({});
const emptyArray = Object.freeze([]);

export type ICreditsNumber = { credits: number };

export interface IForeplanActiveData {
  active: boolean;
  foreplanCourses: Record<string, Pick<ICourse, "name"> & ICreditsNumber>;
  totalCreditsTaken: number;
  futureCourseRequisites: {
    [coursesToOpen: string]: { [requisite: string]: boolean | undefined };
  };
}

export interface IForeplanHelperData {
  courseDirectTake: Record<string, boolean | undefined>;
  courseFailRate: Record<string, number>;
  courseEffort: Record<string, number>;
  advices: readonly PerformanceByLoad[];
}

const defaultForeplanHelperStore: IForeplanHelperData = Object.freeze({
  courseDirectTake: emptyObject,
  courseFailRate: emptyObject,
  courseEffort: emptyObject,
  advices: emptyArray,
});

const ForeplanHelperStore = createStore({
  initialState: defaultForeplanHelperStore,
  actions: {
    setDirectTakeData: (data: string[]) => ({ setState }) => {
      setState({
        courseDirectTake: stringListToBooleanMap(data),
      });
    },
    setFailRateData: (data: { code: string; failRate: number }[]) => ({
      setState,
    }) => {
      setState({
        courseFailRate: data.reduce<Record<string, number>>(
          (acum, { code, failRate }) => {
            acum[code] = failRate;
            return acum;
          },
          {}
        ),
      });
    },
    setEffortData: (data: { code: string; effort: number }[]) => ({
      setState,
    }) => {
      setState({
        courseEffort: data.reduce<Record<string, number>>(
          (acum, { code, effort }) => {
            acum[code] = effort;
            return acum;
          },
          {}
        ),
      });
    },
    setForeplanAdvices: (advices: IForeplanHelperData["advices"]) => ({
      setState,
    }) => {
      setState({
        advices,
      });
    },
  },
});

export const useForeplanHelperData = createHook(ForeplanHelperStore);

export const useForeplanHelperActions = createHook(ForeplanHelperStore, {
  selector: null,
});

export const useForeplanIsDirectTake = createHook(ForeplanHelperStore, {
  selector: ({ courseDirectTake }, { code }: { code: string }) => {
    return (
      courseDirectTake[code] ||
      (courseDirectTake === emptyObject ? undefined : false)
    );
  },
});

export const useForeplanCourseFailRate = createHook(ForeplanHelperStore, {
  selector: ({ courseFailRate }, { code }: { code: string }) => {
    return courseFailRate[code] || 0;
  },
});

export const useForeplanCourseEffort = createHook(ForeplanHelperStore, {
  selector: ({ courseEffort }, { code }: { code: string }) => {
    return courseEffort[code] || 1;
  },
});

export const useForeplanAdvice = createHook(ForeplanHelperStore, {
  selector: (
    { advices },
    { totalCreditsTaken }: { totalCreditsTaken: number }
  ) => {
    return (
      advices.find(({ lowerBoundary, upperBoundary }) => {
        if (
          totalCreditsTaken >= lowerBoundary &&
          totalCreditsTaken <= upperBoundary
        ) {
          return true;
        }
        return false;
      }) ??
      (() => {
        console.warn("Advice not found for ", totalCreditsTaken);
        return advices[advices.length - 1];
      })()
    );
  },
});

export const useForeplanAdvices = createHook(ForeplanHelperStore, {
  selector: ({ advices }) => {
    return advices;
  },
});

const rememberForeplanDataKey = "TrAC_foreplan_data";

const initForeplanActiveData = (
  initialData = defaultForeplanActiveData
): IForeplanActiveData => {
  return initialData;
};

const defaultForeplanActiveData: IForeplanActiveData = Object.freeze({
  active: false,
  foreplanCourses: emptyObject,
  totalCreditsTaken: 0,
  futureCourseRequisites: emptyObject,
});

const ForeplanActiveStore = createStore({
  initialState: initForeplanActiveData(),
  actions: {
    activateForeplan: () => ({ setState }) => {
      setState({
        active: true,
      });
    },
    disableForeplan: () => ({ setState }) => {
      setState({
        active: false,
      });
    },
    addCourseForeplan: (
      course: string,
      data: IForeplanActiveData["foreplanCourses"][string]
    ) => ({ setState, getState }) => {
      const foreplanCourses = { ...getState().foreplanCourses, [course]: data };
      const totalCreditsTaken = reduce(
        foreplanCourses,
        (acum, { credits }) => {
          return acum + credits;
        },
        0
      );

      setState({
        foreplanCourses,
        totalCreditsTaken,
      });
    },
    removeCourseForeplan: (course: string) => ({ setState, getState }) => {
      const {
        foreplanCourses: { [course]: deletedCourse, ...foreplanCourses },
      } = getState();
      const totalCreditsTaken = reduce(
        foreplanCourses,
        (acum, { credits }) => {
          return acum + credits;
        },
        0
      );
      setState({
        foreplanCourses: { ...foreplanCourses },
        totalCreditsTaken,
      });
    },

    setNewFutureCourseRequisites: (
      indirectTakeCourses: { course: string; requisitesUnmet: string[] }[]
    ) => ({ setState }) => {
      setState({
        futureCourseRequisites: indirectTakeCourses.reduce<
          IForeplanActiveData["futureCourseRequisites"]
        >((acum, { course, requisitesUnmet }) => {
          acum[course] = requisitesUnmet.reduce<
            IForeplanActiveData["futureCourseRequisites"][string]
          >((reqAcum, reqCode) => {
            reqAcum[reqCode] = false;
            return reqAcum;
          }, {});
          return acum;
        }, {}),
      });
    },
    setFutureCourseRequisitesState: (
      courseToSetState: string,
      state: boolean
    ) => ({ setState, getState }) => {
      const futureCourseRequisites = { ...getState().futureCourseRequisites };

      if (futureCourseRequisites) {
        for (const courseToOpen in futureCourseRequisites) {
          if (
            futureCourseRequisites[courseToOpen]?.[courseToSetState] !==
            undefined
          ) {
            futureCourseRequisites[courseToOpen] = {
              ...futureCourseRequisites[courseToOpen],
              [courseToSetState]: state,
            };
          }
        }
      }

      setState({
        futureCourseRequisites,
      });
    },
    reset: (data: IForeplanActiveData = defaultForeplanActiveData) => ({
      setState,
    }) => {
      setState({ ...data });
    },
  },
  name: "ForeplanContext",
});

export const useForeplanActiveData = createHook(ForeplanActiveStore);

export const useForeplanActiveActions = createHook(ForeplanActiveStore, {
  selector: null,
});

export const useIsForeplanCourseChecked = createHook(ForeplanActiveStore, {
  selector: ({ foreplanCourses }, { code }: { code: string }) => {
    return !!foreplanCourses[code];
  },
});

export const useForeplanTotalCreditsTaken = createHook(ForeplanActiveStore, {
  selector: ({ totalCreditsTaken }) => {
    return totalCreditsTaken;
  },
});

export const useForeplanCoursesSize = createHook(ForeplanActiveStore, {
  selector: ({ foreplanCourses }) => {
    return size(foreplanCourses);
  },
});

export const useAnyForeplanCourses = createHook(ForeplanActiveStore, {
  selector: ({ foreplanCourses }) => {
    return size(foreplanCourses) > 0;
  },
});

export const useIsForeplanActive = createHook(ForeplanActiveStore, {
  selector: ({ active }) => {
    return active;
  },
});

export const useForeplanCourses = createHook(ForeplanActiveStore, {
  selector: ({ foreplanCourses }) => {
    return foreplanCourses;
  },
});

export const useIsPossibleToTakeForeplan = createHook(ForeplanActiveStore, {
  selector: ({ active }, { state }: { state: StateCourse | undefined }) => {
    if (active) {
      switch (state) {
        case undefined:
        case StateCourse.Failed:
        case StateCourse.Canceled: {
          return true;
        }
        default:
      }
    }
    return false;
  },
});

export const useForeplanIsFutureCourseRequisitesFulfilled = createHook(
  ForeplanActiveStore,
  {
    selector: ({ futureCourseRequisites }, { code }: { code: string }) => {
      return (
        !!futureCourseRequisites[code] && every(futureCourseRequisites[code])
      );
    },
  }
);

export const ForeplanContextManager: FC = () => {
  const { program, student, mock, chosenCurriculum } = useDashboardInputState();
  const [state, { reset, disableForeplan }] = useForeplanActiveData();
  const { user } = useUser({
    fetchPolicy: "cache-only",
  });

  const [setRememberForeplan] = useMutation(SET_CONSISTENCY_VALUE, {
    ignoreResults: true,
  });

  const [key, setKey] = useState(
    rememberForeplanDataKey +
      `${chosenCurriculum || ""}${program || ""}${student || ""}${mock ? 1 : 0}`
  );

  useDebounce(
    () => {
      setKey(
        rememberForeplanDataKey +
          `${chosenCurriculum || ""}${program || ""}${student || ""}${
            mock ? 1 : 0
          }`
      );
    },
    500,
    [chosenCurriculum, program, student, mock, setKey]
  );

  const {
    data: dataRememberForeplan,
    loading: loadingRememberForeplan,
  } = useQuery(GET_CONSISTENCY_VALUE, {
    variables: {
      key,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loadingRememberForeplan) {
      if (dataRememberForeplan?.getConsistencyValue) {
        reset({
          ...defaultForeplanActiveData,
          ...dataRememberForeplan.getConsistencyValue.data,
        });
      }
    } else {
      reset();
    }
  }, [dataRememberForeplan, loadingRememberForeplan, reset]);

  const [, { setTrackingData }] = useTracking();

  useEffect(() => {
    if (!loadingRememberForeplan) {
      const coursesArray = Object.keys(state.foreplanCourses);
      setTrackingData({
        foreplanActive: state.active,
        foreplanCredits: state.active ? state.totalCreditsTaken : undefined,
        foreplanCourses:
          coursesArray.length > 0 ? coursesArray.join("|") : undefined,
      });
    }
  }, [state, setTrackingData, loadingRememberForeplan]);

  useEffect(() => {
    if (state.active && !user?.config.FOREPLAN) {
      disableForeplan();
    }
  }, [user, state.active, disableForeplan]);

  useDebounce(
    () => {
      if (user?.config.FOREPLAN) {
        setRememberForeplan({
          variables: {
            key,
            data: state,
          },
        });
      }
    },
    3000,
    [key, state, user, setRememberForeplan]
  );

  return null;
};
