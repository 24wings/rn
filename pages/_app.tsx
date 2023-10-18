import {
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { appWithTranslation, useTranslation } from "next-i18next";
import { authProvider } from "src/authProvider";
import {  RefineThemes } from "@refinedev/antd";

import { ConfigProvider,theme } from "antd";

const API_URL = "/api";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2

        Header={() => <Header sticky />}
        Sider={(props) => <ThemedSiderV2     {...props}  fixed />}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ConfigProvider theme={{algorithm:theme.darkAlgorithm}}>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
              
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                
                resources={[
                  {
                    
                    identifier:"blog-posts",
                    name: "blog_posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: {
                      label:"博客",
                      name:"博客",
                      canDelete: true,
                    },
                  },
                  {
                    name:"角色权限"
                  },
                  {
                    name: "/rbac/users",
                    list: "/rbac/users",
                    create: "/rbac/users/create",
                    edit: "/rbac/users/edit/:id",
                    show: "/rbac/users/show/:id",
                    options:{
                      
                      name:"用户"
                    },
                    meta: {
                      label:'用户',
                      canDelete: true,
                      parent:"角色权限",
                      name:"用户"
                    },
                  },
                  
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                      parent:"角色权限"
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "makUiP-sl9MOy-AJfq5J",
                }}
              >
                {renderComponent()}
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
        </ConfigProvider>
      </RefineKbarProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
