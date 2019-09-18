const menu = [
  {
    title: 'Uno',
    key: 'documentation',
    url: '/dashboard/alpha',
    icon: 'icmn icmn-books',
  },
  {
    title: 'Menu',
    key: 'pages',
    icon: 'icmn icmn-stack',
    children: [
      {
        title: 'Uno',
        key: 'dashboardAlpha',
        url: '/dashboard/alpha',
      },
      {
        title: 'Dos',
        key: 'dashboardBeta',
        url: '/dashboard/beta',
        pro: true,
      },
      {
        title: 'Tres',
        key: 'dashboardCrypto',
        url: '/dashboard/beta',
        pro: true,
      },
      {
        title: 'Cuatro',
        key: 'dashboardGamma',
        url: '/dashboard/beta',
        pro: true,
      },
      {
        title: 'Cinco',
        key: 'dashboardDocs',
        url: '/dashboard/beta',
        pro: true,
      },
      {
        divider: true,
      },
      {
        title: 'Menu dos',
        key: 'defaultPages',
        children: [
          {
            key: 'loginAlpha',
            title: 'Login Alpha',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            key: 'loginBeta',
            title: 'Login Beta',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            key: 'register',
            title: 'Register',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            key: 'lockscreen',
            title: 'Lockscreen',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            key: 'pricingTable',
            title: 'Pricing Tables',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            key: 'invoice',
            title: 'Invoice',
            url: '/dashboard/beta',
            pro: true,
          },
        ],
      },
      {
        title: 'Ecommerce',
        key: 'ecommerce',
        children: [
          {
            title: 'Dashboard',
            key: 'dashboard',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Products Catalog',
            key: 'productsCatalog',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Products Details',
            key: 'productsDetails',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Products Edit',
            key: 'productsEdit',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Products List',
            key: 'productsList',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Orders',
            key: 'orders',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Cart',
            key: 'cart',
            url: '/dashboard/beta',
            pro: true,
          },
        ],
      },
      {
        title: 'Apps',
        key: 'apps',
        children: [
          {
            title: 'Messaging',
            key: 'messaging',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Mail',
            key: 'mail',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Profile',
            key: 'profile',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Gallery',
            key: 'gallery',
            url: '/dashboard/beta',
            pro: true,
          },
        ],
      },
    ],
  },
  {
    title: 'AntDesign',
    key: 'antComponents',
    icon: 'icmn icmn-menu',
    url: '/dashboard/beta',
  },
  {
    title: 'Components',
    key: 'pagesBlocks',
    icon: 'icmn icmn-stack',
    children: [
      {
        title: 'Charts',
        key: 'charts',
        children: [
          {
            title: 'Chartist',
            key: 'chartist',
            url: '/dashboard/beta',
          },
          {
            title: 'Chart',
            key: 'chart',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'Peity',
            key: 'peity',
            url: '/dashboard/beta',
            pro: true,
          },
          {
            title: 'C3',
            key: 'c3',
            url: '/dashboard/beta',
            pro: true,
          },
        ],
      },
      {
        title: 'Mail Templates',
        key: 'mailTemplates',
        url: '/dashboard/beta',
        pro: true,
      },
      {
        title: 'Icons',
        key: 'icons',
        children: [
          {
            title: 'FontAwesome',
            key: 'fontAwesome',
            url: '/dashboard/beta',
          },
          {
            title: 'Linear',
            key: 'linear',
            url: '/dashboard/beta',
          },
          {
            title: 'Icomoon',
            key: 'icoMoon',
            url: '/dashboard/beta',
          },
        ],
      },
      {
        title: 'Bootstrap Grid',
        key: 'bootstrap',
        url: '/dashboard/beta',
      },
      {
        title: 'Bootstrap Card',
        key: 'card',
        url: '/dashboard/beta',
      },
      {
        title: 'Typography',
        key: 'typography',
        url: '/dashboard/beta',
      },
      {
        title: 'Utilities',
        key: 'utilities',
        url: '/dashboard/beta',
      },
      {
        title: 'Nested Items',
        key: 'nestedItem1',
        disabled: true,
        children: [
          {
            title: 'Nested Item 1-1',
            key: 'nestedItem1-1',
            children: [
              {
                title: 'Nested Item 1-1-1',
                key: 'nestedItem1-1-1',
              },
              {
                title: 'Nested Items 1-1-2',
                key: 'nestedItem1-1-2',
                disabled: true,
              },
            ],
          },
          {
            title: 'Nested Items 1-2',
            key: 'nestedItem1-2',
          },
        ],
      },
      {
        title: 'Disabled Item',
        key: 'disabledItem',
        disabled: true,
      },
    ],
  },
  2,
]
export async function getLeftMenuData() {
  return menu
}
export async function getTopMenuData() {
  return menu
}
