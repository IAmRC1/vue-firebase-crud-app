<template>
  <div class="d-flex align-items-center">
    <div class="col-7">
      <img :src="event.eventimage" width="100%" height="500" />
    </div>
    <div class="col-5">
      <h3>{{event.title}}</h3>
      <p>{{event.description}}</p>
      <p>{{event.author_name}}</p>
      <p>{{event.phone}}</p>
      <p>{{event.address}}</p>
      <p>{{event.eventstart}}</p>
      <p>{{event.eventend}}</p>
    </div>
  </div>
</template>

<script>
import { eventsCollection } from '../Firebase'

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
      console.log(doc.id, " => ", doc.data());
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
}
</script>
<style scoped>

</style>