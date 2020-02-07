import { GraphQLJSONObject } from "graphql-type-json";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { IContext } from "../../../interfaces";
import { ConsistencyTable } from "../../db/tables";
import { Consistency } from "../../entities/auth/consistency";
import { assertIsDefined } from "../../utils/assert";

@Resolver(() => Consistency)
export class ConsistencyResolver {
  @Authorized()
  @Query(() => Consistency, { nullable: true })
  async getConsistencyValue(
    @Ctx() { user }: IContext,
    @Arg("key") key: string
  ): Promise<Consistency | undefined> {
    assertIsDefined(user, "User context is not working properly");

    const consistencyValue = await ConsistencyTable()
      .select("*")
      .where({
        user: user.email,
        key,
      })
      .first();

    return consistencyValue;
  }

  @Authorized()
  @Mutation(() => Consistency)
  async setConsistencyValue(
    @Ctx() { user }: IContext,
    @Arg("key") key: string,
    @Arg("data", () => GraphQLJSONObject) data: Record<string, any>
  ): Promise<Consistency> {
    assertIsDefined(user, "User context is not working properly");

    const existsValue = await ConsistencyTable()
      .select("key")
      .where({
        user: user.email,
        key,
      })
      .first();

    let consistencyValue = {
      user: user.email,
      key,
      data,
    };
    try {
      if (existsValue) {
        await ConsistencyTable()
          .update({
            data,
          })
          .where({
            user: user.email,
            key,
          });
      } else {
        await ConsistencyTable().insert({
          user: user.email,
          key,
          data,
        });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }

    assertIsDefined(
      consistencyValue,
      "Error on consistency creation! " +
        user +
        " " +
        key +
        " " +
        JSON.stringify(data)
    );

    return consistencyValue;
  }
}
