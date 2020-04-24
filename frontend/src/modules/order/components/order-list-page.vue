<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.order.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.order.list.title"></app-i18n>
      </h1>
      <form onsubmit="emailSubmit()" id="mailform">
        <input type="text" id="name_mail" name="name_mail" v-model="currentUserNameOrEmailPrefix" hidden>
        <div>
          <label for="subject_mail">Subject: </label>
          <input type="text" id="subject_mail" name="subject_mail" style="border-radius: 1em;">
        </div><br>
        <div>
          <label for="templates_mail">Choose a template: </label>
          <select id="templates_mail" style="border-radius: 1em;">
            <option value="formal">Formal</option>
            <option value="fun">Fun</option>
            <option value="simple">Simple</option>
          </select>
        </div><br>
        <div style="display: flex;">
          <div style="flex: 1;">
            <p style="text-align: center;">Formal</p>
            <img src="https://i.ibb.co/wdXNXGH/formal.png" alt="formal" border="0" style="width: 17em;display: block;margin: auto;"> 
          </div>
          <div style="flex: 1;">
            <p style="text-align: center;">Fun</p>
            <img src="https://i.ibb.co/yXJ0Y9F/fun.png" alt="fun" border="0" style="width: 17em;display: block;margin: auto;">
          </div>
          <div style="flex: 1;">
            <p style="text-align: center;">Simple</p>
            <img src="https://i.ibb.co/4WVxb5Z/simple.png" alt="simple" border="0" style="width: 17em;display: block;margin: auto;">
            
          </div>
        </div><br>
        <div>
          <label for="img_mail">Select image: </label>
          <input type="file" id="img_mail" name="img" accept="image/*">
        </div><br>
        <div>
          <label for="body_mail">Email content: </label><br>
          <textarea id="body_mail" rows="5" cols="60" style="border-radius: 1em;">
          </textarea>
        </div><br>
        <label for="date_mail">Date: </label>
        <input type="text" id="date_mail" style="border-radius: 1em;"><br><br>
        <input type="submit">
        </form>
    </div>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/7.14.0/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-functions.js"></script>
<script>
const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");

function emailSubmit(){
  console.log("here");
    const name = document.getElementById("name_mail").value;
    const subject = document.getElementById("subject_mail").value;
    const template = document.getElementById("templates_mail").value;
    const body = document.getElementById("body_mail").value;
    const date = document.getElementById("date_mail").value;   
    const array = [name, subject, template, body, date];
    const sendMail = firebase.functions().httpsCallable('sendMail');
    sendMail(array).then(function(result){
      console.log(result);
    }); 
  };

import OrderListFilter from '@/modules/order/components/order-list-filter.vue';
import OrderListTable from '@/modules/order/components/order-list-table.vue';
import OrderListToolbar from '@/modules/order/components/order-list-toolbar.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentUserNameOrEmailPrefix:
        'auth/currentUserNameOrEmailPrefix',
      currentUserAvatar: 'auth/currentUserAvatar',
      isMobile: 'layout/isMobile',
    }),
  },

  name: 'app-order-list-page',

  components: {
    [OrderListFilter.name]: OrderListFilter,
    [OrderListTable.name]: OrderListTable,
    [OrderListToolbar.name]: OrderListToolbar,
  },
};
</script>

<style>
</style>
