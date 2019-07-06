    <!-- =========================================================================================
    File Name: ChangeTimeDurationDropdown.vue
    Description: Change duration dropdown component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vs-dropdown vs-trigger-click class="cursor-pointer">
        <small class="flex cursor-pointer">Last 7 days <feather-icon icon='ChevronDownIcon' svgClasses='h-4 w-4' class='ml-1'></feather-icon></small>
        <vs-dropdown-menu class="w-32">
            <vs-dropdown-item @click="$emit('timeDurationChanged', {timeable: 'day', long: '7'})">Last 7 Days</vs-dropdown-item>
            <vs-dropdown-item @click="$emit('timeDurationChanged', {timeable: 'day', long: 'this-week'})">This Week</vs-dropdown-item>
            <vs-dropdown-item @click="$emit('timeDurationChanged', {timeable: 'day', long: 'this-month'})">This Month</vs-dropdown-item>
            <vs-dropdown-item @click="$emit('timeDurationChanged', {timeable: 'month', long: 'last-week'})">Last Week</vs-dropdown-item>
            <vs-dropdown-item @click="$emit('timeDurationChanged', {timeable: 'month', long: 'last-month'})">Last Month</vs-dropdown-item>
            <vs-dropdown-item @click="$emit('timeDurationChanged', {timeable: 'year', long: 'last-year'})">Last Year</vs-dropdown-item>
        </vs-dropdown-menu>
    </vs-dropdown>
</template>
