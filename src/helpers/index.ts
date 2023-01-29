import { faker } from "@faker-js/faker";

export const getFakeRowData = (): RowData => {
  const lastName = faker.name.lastName();
  const id = faker.datatype.uuid();
  const status = faker.helpers.arrayElement(["Active", "Pro", "Beginner"]);

  return {
    id,
    lastName,
    status,
  };
};
export type RowData = {
  id: string;
  lastName: string;
  status: string; // May be an enum type!
};

enum Status {
  Active = "Active",
  Pro = "Pro",
  Beginner = "Beginner",
}
