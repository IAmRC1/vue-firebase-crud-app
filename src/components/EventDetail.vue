<template>
  <div class="d-flex align-items-start">
    <div class="col-6">
      <img v-if="event.eventimage" class="card-img-top" :src="event.eventimage" alt="Card image cap" width="100%" height="500">
      <img v-else class="card-img-top" src="../assets/no_event_image.png" alt="Card image cap" width="100%" height="500">
    </div>
    <div class="col-6">
      <h3>{{event.title}}</h3>
      <p>Description: {{event.description}}</p>
      <p>Authority's Name: {{event.author_name}}</p>
      <p>Contact Number: {{event.phone}}</p>
      <p>Location: {{event.address}}</p>
      <p>Starts on: {{event.eventstart}}</p>
      <p>Ends on: {{event.eventend}}</p>
      <p>Event Duration: <span class="text-danger">{{ eventduration }} days</span></p>
      <img :src="event.authorimage" width="200" height="200" />
    </div>
  </div>
</template>

<script>
import { eventsCollection } from '../Firebase'
import moment from 'moment'

export default {
  name: 'EventDetail',
  data () {
    return {
      loading: false,
      event: {},
      errors: [],
      eventsRef: eventsCollection,
    }
  },
  created () {
    this.eventsRef.doc(this.$route.params.id).get().then(doc => {
      //console.log(doc.id, " => ", doc.data());
      this.event = {
        title: doc.data().title,
        description: doc.data().description,
        phone: doc.data().phone,
        author_name: doc.data().author_name,
        address: doc.data().address,
        eventstart: doc.data().eventstart,
        eventend: doc.data().eventend,
        eventimage: doc.data().eventimage,
        authorimage: doc.data().authorimage
      }
    })
    .catch(function(error) {
        console.log("Error getting event: ", error);
    });
  },
  computed : {
    eventduration: function() {
      let start = this.event && this.event.eventstart;
      let end = this.event && this.event.eventend;
      return moment(end).diff(moment(start), 'days')
    }
  }
}
</script>