/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/products",
    name: "Products",
    slug: "products",
    icon: "ListIcon",
  },
  {
    url: "/stocks",
    name: "Stocks",
    slug: "stocks",
    icon: "LayersIcon",
  },
  {
    url: "/orders",
    name: "Orders",
    slug: "orders",
    icon: "BoxIcon",
  },
  {
    url: "/customers",
    name: "Customers",
    slug: "customers",
    icon: "ZapIcon",
  },
  {
    url: "/returns",
    name: "Returns",
    slug: "returns",
    icon: "ArchiveIcon",
  },
  {
    url: "/shipment",
    name: "Shipment",
    slug: "shipment",
    icon: "TruckIcon",
  },
  {
    url: null,
    name: "Location",
    slug: "location",
    icon: "MapIcon",
    submenu: [{
        url: "/location/provinces",
        name: "Povinces",
      },
      {
        url: "/location/cities",
        name: "Cities",
      },
      {
        url: "/location/subdistricts",
        name: "Subdistricts",
      },
    ]
  },
  {
    url: "/vouchers",
    name: "Vouchers",
    slug: "vouchers",
    icon: "GiftIcon",
  },
]
