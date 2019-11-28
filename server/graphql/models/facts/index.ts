import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
class Fact {
  @Field(type => ID)
  id!: number;

  @Field(type => String)
  text!: string;
}

@InputType()
class FactInput implements Partial<Fact>{
  @Field(type => String)
  text!: string;
}

export {
  Fact,
  FactInput,
}