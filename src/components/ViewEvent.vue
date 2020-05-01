<template>
    <div>
      <h2>
        All Events
      </h2>
      <div v-if="loading">
        <ul class="d-flex flex-wrap list-unstyled justify-content-between mt-4">
            <li v-for="event in events" :key="event.key" class="mb-5 position-relative">
              <router-link :to="{ name: 'EventDetail', params: { id: event.key }}"  class="text-decoration-none">
              <div class="card" style="width: 20rem;">
                <img class="card-img-top" :src="event.eventimage" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title text-dark font-weight-bold font-italic mb-0">{{event.title}}</h5>
                  <span class="badge badge-dark date-badge">{{moment(event.eventstart).format('MMM D, YYYY')}}</span>
                </div>
              </div>
              </router-link>
            </li>
        </ul>
      </div>
      <div v-else class="jumbotron">
        <h3>Loading...</h3>
      </div>
    </div>
</template>

<script>
import { eventsCollection } from '../Firebase'

export default {
  name: 'ViewEvent',
  data () {
    return {
      loading: false,
      events: [],
      errors: [],
      eventsRef: eventsCollection,
    }
  },
  created () {
    this.eventsRef.get().then((querySnapshot) => {
      this.events = [];
      querySnapshot.forEach((doc) => {
        this.loading = true
        // console.log(doc.id, " => ", doc.data());
        this.events.push({
          key: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          phone: doc.data().phone,
          author_name: doc.data().author_name,
          address: doc.data().address,
          eventstart: doc.data().eventstart,
          eventend: doc.data().eventend,
          eventimage: doc.data().eventimage,
          authorimage: doc.data().authorimage
        });
      });
      
    })
    .catch(function(error) {
        console.log("Error getting events: ", error);
    });
    this.loading = false
  },
}
</script>

<style scoped>
  .card{
    transition: all 0.3s ease-in;
  }
  .card:hover {
    transform: rotateZ(2deg);
    transition: all 0.3s ease-in;
  }
  .card-body{
    background-color: #f8f8ff;
    padding: 1rem;
  }
  .card-title{
    font-size: 1.25rem;
  }
  .card-text{
    font-size: 1rem;
    margin: 0;
  }
  .date-badge{
    position: absolute;
    top:0;
    right:0;
    font-size: 1rem;
  }
</style>
