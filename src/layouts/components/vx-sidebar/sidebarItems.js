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
    url: null,
    name: "Products",
    slug: "products",
    icon: "ListIcon",
    submenu: [{
        url: "/products",
        name: "All",
      },
      {
        url: "/products?status=live",
        name: "Live",
      },
      {
        url: "/products?status=draft",
        name: "Draft",
      }
    ]
  },
  {
    url: "/stocks",
    name: "Stocks",
    slug: "stocks",
    icon: "LayersIcon",
  },
  {
    url: null,
    name: "Orders",
    slug: "orders",
    icon: "BoxIcon",
    submenu: [{
        url: "/orders",
        name: "All",
      },
      {
        url: "/orders?status=pending",
        name: "Pending",
      },
      {
        url: "/orders?status=processing",
        name: "Processing",
      },
      {
        url: "/orders?status=completed",
        name: "Completed",
      },
      {
        url: "/orders?status=expired",
        name: "Expired",
      },
      {
        url: "/orders?status=payment_failed",
        name: "Payment Failed",
      },
    ]
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
