interface RouteConfig {
  path?: string;
  name: string;
  component?: any;
  icon?: string;
  redirect?: string;
  children?: RouteConfig[];
  alias?: string | string[];
  beforeEnter?: (to: any, from: any, next: any) => void;
  props?: boolean | object | (() => object);
  sensitive?: boolean;
  strict?: boolean;
  meta?: {
    title?: string;
    hidden?: boolean;
    keepAlive?: boolean;
    defaultKeepAlive?: boolean;
    keepAliveName?: string;
    roles?: string[] | string;
    routes?: RouteConfig[];
    [propName: string]: any;
  };
  [propName: string]: any;
}

const defaultRoutes: RouteConfig[] = [
];

export const ROUTE_MENU: RouteConfig[] = [
  ...defaultRoutes,
  {
    path: "/test-page",
    name: "test-page",
    meta: {
      title: "Trang test code",
      hidden: true,
    },
    icon: "TeamOutlined",
    component: () => import("@/views/TestPage.vue"),
  },
];

export const ROUTE_KEYS_NAME: any = {
  ROUTE_MENU: "ROUTE_MENU",
};
