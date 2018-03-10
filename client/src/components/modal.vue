<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-click-outside="onCancelClick">

          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="button is-success is-outlined" @click="onCloseClick">OK</div>
              <div class="button is-danger is-outlined" @click="onCancelClick">Cancel</div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'modal',
    methods: {
      onCloseClick () {
        this.$emit('close')
      },
      onCancelClick () {
        this.$emit('redoChanges')
      }
    }
  }
</script>
<style lang="scss">
  $modal-padding: 16px;
  $modal-border-color: #e5e5e5;

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 640px;
    margin: 0px auto;
    /*padding: 16px;*/
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    padding: $modal-padding;
    border-bottom: 1px solid $modal-border-color;
  }

  .modal-body {
    padding: $modal-padding;
    /*margin: 16px 0;*/
  }

  .modal-footer {
    padding: $modal-padding;
    border-top: 1px solid $modal-border-color;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
