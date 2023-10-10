import { get } from "lodash";

const mapChildrenTree = (data: any) => {
  return data.map((item: any) => ({
    title: item.name,
    value: item._id,
    key: item._id,
    status: item.status,
    children: mapChildrenTree(item.children),
  }));
};
const mapDataUser = (data: any, fieldValue: any, fieldName: any) => {
  if (data && data.length > 0) {
    try {
      const results = data.map((item: any) => {
        return {
          value: get(item, fieldValue),
          label: get(item, fieldName) + " - " + get(item, "email"),
          info: item,
        };
      });
      return results;
    } catch (error: any) {
      return [];
    }
  } else return [];
};
export { mapChildrenTree, mapDataUser };
