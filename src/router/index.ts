import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import * as subRoutesConfig from "./sub_config";
// import { authRoute } from "./auth_router";
const defaultRoute = "/dashboard/users";
const Client = () => import("@/layouts/Client.vue");
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => Client(),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/client/Home.vue"),
        meta: {
          title: "Home",
          hidden: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

interface BreadcrumbRoute {
  path: string;
  breadcrumbName: string;
  icon: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
    icon: string;
  }>;
}
const ROUTE_MENU_CONFIG_ALL_OBJ: {
  [propName: string]: {
    [propName: string]: {
      path: string;
      title: string;
      name: string;
      openKeys: string[];
      breadcrumbRoutes: BreadcrumbRoute[];
      [propName: string]: any;
    };
  };
} = {};
function getRoutesConfig(
  subRoutesKey: string,
  routes: any[],
  openKeys: string[] = [],
  breadcrumbRoutes: BreadcrumbRoute[] = [
    { path: "/", breadcrumbName: "Home", icon: "HomeOutlined" },
  ]
): void {
  if (!ROUTE_MENU_CONFIG_ALL_OBJ[subRoutesKey]) {
    ROUTE_MENU_CONFIG_ALL_OBJ[subRoutesKey] = {};
  }
  routes.forEach((routeConfig: any) => {
    if (routeConfig.routes) {
      getRoutesConfig(
        subRoutesKey,
        routeConfig.routes,
        openKeys.length == 0
          ? [routeConfig.name]
          : [...openKeys, routeConfig.name],
        [
          ...breadcrumbRoutes,
          {
            path: routeConfig.path,
            breadcrumbName: routeConfig.meta.title,
            icon: routeConfig.icon ?? "FolderOpenOutlined",
            children:
              routeConfig.routes.length === 1
                ? undefined
                : routeConfig.routes.map((childRoute: any) => {
                    return {
                      path: childRoute.path,
                      breadcrumbName: childRoute.meta.title,
                      icon: childRoute.icon ?? "UnorderedListOutlined",
                    };
                  }),
          },
        ]
      );
    } else {
      ROUTE_MENU_CONFIG_ALL_OBJ[subRoutesKey][routeConfig.name] = {
        ...routeConfig,
        path: routeConfig.path,
        title: routeConfig.meta.title,
        name: routeConfig.name,
        openKeys: openKeys,
        breadcrumbRoutes: [
          ...breadcrumbRoutes,
          {
            path: routeConfig.path,
            breadcrumbName: routeConfig.meta.title,
            icon: routeConfig.icon ?? "UnorderedListOutlined",
          },
        ],
      };
      router.addRoute("dashboard", routeConfig);
    }
  });
}
for (const subRoutesKey in subRoutesConfig) {
  if ("ROUTE_KEYS_NAME" == subRoutesKey) {
    continue;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  getRoutesConfig(subRoutesKey, subRoutesConfig[subRoutesKey]);
}
// authRoute(router);
export default router;
export const noAuthList: string[] = ["home"];
export const DEFAULT_ROUTE: string = defaultRoute;
export const ROUTE_MENU_CONFIGS = Object.keys(ROUTE_MENU_CONFIG_ALL_OBJ).reduce(
  (configs: any, key: string) => {
    return { ...configs, ...ROUTE_MENU_CONFIG_ALL_OBJ[key] };
  },
  {}
);
