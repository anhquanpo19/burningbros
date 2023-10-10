import { get } from "lodash";
import Services from "@/repositories/index";
import { message } from "ant-design-vue";
import { languages, defaultLocale } from "@/i18n";
type RecordsResult = {
  data: Array<any>[];
  code: number;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  };
};
const capitalizeFirstLetter = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
};

const mapData = (data: any, fieldValue: any, fieldName: any) => {
  if (data && data.length > 0) {
    try {
      const results = data.map((item: any) => {
        return {
          value: get(item, fieldValue),
          label: get(item, fieldName),
          info: item,
        };
      });
      return results;
    } catch (error: any) {
      return [];
    }
  } else return [];
};

const mapCustomFields = (data: any) => {
  if (data && data.length > 0) {
    try {
      const results = data.map((item: any) => ({
        value: item,
        label: item,
      }));
      return results;
    } catch (error: any) {
      return [];
    }
  } else return [];
};
const mapTree = (data: any) => {
  return mapParent(
    data.map((item: any) => ({
      ...item,
      parent: checkData(item.parent),
    }))
  );
};
const checkData = (data: any) => {
  if (data) {
    if (typeof data === "object") {
      return data._id;
    } else {
      return data;
    }
  }
  return null;
};
const mapParent = (data: any, _id = null) => {
  const results = data
    .filter((item: any) => item["parent"] === _id)
    .map((item: any) => ({
      title: item.name,
      value: item._id,
      key: item._id,
      children: mapParent(data, item._id),
    }));
  return results;
};

const getList = async (repo: string, params: any) => {
  const resultData = {} as RecordsResult;
  try {
    const Service = Services.get(repo);
    const result = await Service.getList(params);
    if (result.data.code == 1) {
      resultData.data = result.data.data;
    }
    return resultData;
  } catch (error) {
    message.error("Không tìm thấy dữ liệu yêu cầu!", 3);
    return resultData;
  }
};

const getById = async (repo: string, id: string) => {
  const Service = Services.get(repo);
  try {
    const result = await Service.getById(id);
    if (result.data.code == 1) {
      return result.data.data;
    }
  } catch (error) {
    message.error("Không tìm thấy dữ liệu yêu cầu!", 3);
    return false;
  }
};

const create = async (repo: string, payload: any) => {
  const Service = Services.get(repo);
  try {
    const result = await Service.create(payload);
    if (result.data.code == 1) {
      return result.data;
    } else return false;
  } catch (error: any) {
    const mess = get(
      languages[`${defaultLocale}`],
      `error.${error.response.data.sys_message}`
    );
    message.error(mess, 3);
    return false;
  }
};

const update = async (repo: string, id: string, payload: any) => {
  const Service = Services.get(repo);
  try {
    const result = await Service.update(id, payload);
    if (result.data.code == 1) {
      return result.data;
    } else return false;
  } catch (error: any) {
    // const mess = get(
    //   languages[`${defaultLocale}`],
    //   `error.${error.response.data.sys_message}`
    // );
    const mess = error.response.data.message;
    message.error(mess, 3);
    return false;
  }
};

const deleteById = async (repo: string, id: string) => {
  const Service = Services.get(repo);
  try {
    const result = await Service.delete(id);
    if (result.data.code == 1) {
      return result.data;
    } else return false;
  } catch (error) {
    message.error("Quá trình xoá dữ liệu xảy ra lỗi!", 3);
    return false;
  }
};
const exportTable = async (
  repo: string,
  params: any,
  nameDownload: string,
  functionName = String("export")
) => {
  try {
    const Service = Services.get(repo);
    const result = await Service[functionName](params);
    if (result.status == 200) {
      const url = window.URL.createObjectURL(
        new Blob([result.data], {
          type: "application/vnd.ms-excel",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${nameDownload}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else message.error("Không tìm thấy dữ liệu yêu cầu!", 3);
  } catch (error) {
    message.error("Không tìm thấy dữ liệu yêu cầu!", 3);
  }
};
const upload = async (repo: string, files: Array<any>) => {
  try {
    const Service = Services.get(repo);
    const formDataFile = new FormData();
    for (const file of files)
      formDataFile.append("uploadFiles", file.originFileObj);
    const result = await Service.upload(formDataFile);
    if (result.data.code == 1) {
      return result.data.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const approval = async (repo: string, id: string) => {
  const Service = Services.get(repo);
  try {
    const result = await Service.approval(id);
    if (result.data.code == 1) {
      return result.data;
    } else return false;
  } catch (error: any) {
    const mess = get(
      languages[`${defaultLocale}`],
      `error.${error.response.data.sys_message}`
    );
    message.error(mess, 3);
    return false;
  }
};
const reject = async (repo: string, id: string) => {
  const Service = Services.get(repo);
  try {
    const result = await Service.reject(id);
    if (result.data.code == 1) {
      return result.data;
    } else return false;
  } catch (error: any) {
    const mess = get(
      languages[`${defaultLocale}`],
      `error.${error.response.data.sys_message}`
    );
    message.error(mess, 3);
    return false;
  }
};

export {
  capitalizeFirstLetter,
  mapData,
  mapCustomFields,
  mapTree,
  getList,
  getById,
  create,
  update,
  deleteById,
  exportTable,
  upload,
  approval,
  reject,
};
