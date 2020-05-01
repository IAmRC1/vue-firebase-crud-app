<template>
  <div class="card">
    <div class="card-header">
        <h3>Add Event</h3>
    </div>
    <div class="card-body">
        <form v-on:submit.prevent="onSubmit"  enctype="multipart/form-data">
          <div  class="d-flex justify-content-between">
            <div class="col">
              <div class="form-group row">
                <label class="col-3 col-form-label">Title</label>
                <div class="col">
                  <input type="text" class="form-control" v-model="eventData.title">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">Phone No.</label>
                <div class="col">
                  <input type="text" maxlength="10" class="form-control" v-model="eventData.phone">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">Author Name</label>
                <div class="col">
                  <input type="text" class="form-control" v-model="eventData.author_name">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">Address</label>
                <div class="col">
                  <input type="text" class="form-control" v-model="eventData.address">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">Event Start Date</label>
                <div class="col">
                  <input type="date" class="form-control" min="2019-04-30" max="2021-12-31" v-model="eventData.eventstart">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">Event End Date</label>
                <div class="col">
                  <input type="date" class="form-control" min="2019-04-30" max="2021-12-31" v-model="eventData.eventend">
                </div>
              </div>
            </div>
          
            <div class="col">
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" rows="5" v-model="eventData.description"></textarea>
              </div>
              <div class="form-group">
                <label>Event Image</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" @change="onEventImageSelected" accept="image/*">
                  <label v-if="eventimagename" class="custom-file-label">{{eventimagename}}</label>
                  <label v-else class="custom-file-label">Choose file</label>
                </div>
              </div>
              <div class="form-group">
                <label>Author Image</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" @change="onAuthorImageSelected" accept="image/*">
                  <label v-if="authorimagename" class="custom-file-label">{{authorimagename}}</label>
                  <label v-else class="custom-file-label">Choose file</label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group float-right">
              <input type="submit" class="btn btn-primary px-5" value="Save" :disabled="isDisabled">
          </div>
        </form>
    </div>
</div>
</template>

<script>
import { eventsCollection } from '../Firebase'
import router from '../router'

export default {
  name: 'AddEvent',
  data () {
    return {
      eventsRef: eventsCollection,
      eventData: {}, 
      eventimage: null,
      eventimagename: null,
      authorimage: null,
      authorimagename: null,
    }
  },
  methods: {
    onSubmit () {
      console.log('this.eventData', this.eventData)
      this.eventsRef
      .add(this.eventData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        router.push({
          name: 'ViewEvent'
        })
      })
      .catch((error) => {
        alert("Error adding event: ", error);
      });
    },
    onEventImageSelected(e) {
      this.eventimage = e.target.files[0]
      this.eventimagename = e.target.files[0].name
      let reader = new FileReader();
      reader.onloadend = () => {
        // console.log('base64 string', reader.result)
        this.eventData.eventimage = reader.result
      }
      reader.readAsDataURL(this.eventimage);
    },
    onAuthorImageSelected(e) {
      this.authorimage = e.target.files[0]
      this.authorimagename = e.target.files[0].name
      let reader1 = new FileReader();
      reader1.onloadend = () => {
        // console.log('base64 string', reader1.result)
        this.eventData.authorimage = reader1.result
      }
      reader1.readAsDataURL(this.authorimage);
    },
    
  },
  computed: {
      isDisabled() {
        if(!this.eventData.title || !this.eventData.description || !this.eventData.phone || !this.eventData.author_name || !this.eventData.address){
          return true
        }
        return false
      },
    },
}
</script>
<style scoped>
  /* ::-webkit-datetime-edit { padding: 1em; }
  ::-webkit-datetime-edit-fields-wrapper { background: silver; }
  ::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; }
  ::-webkit-datetime-edit-month-field { color: blue; }
  ::-webkit-datetime-edit-day-field { color: green; }
  ::-webkit-datetime-edit-year-field { color: purple; }
  ::-webkit-inner-spin-button { display: none; }
  ::-webkit-calendar-picker-indicator { background: orange; } */
</style>