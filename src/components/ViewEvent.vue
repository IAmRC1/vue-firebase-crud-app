<template>
    <div>
      <h2>
        All Events
      </h2>
      <div v-if="loading" class="loader">
        <atom-spinner
          :animation-duration="1000"
          :size="100"
          :color="'#ff1d5e'"
          class="m-auto"
        />
      </div>
      <div v-else-if="events.length === 0">
        <h3 class="display-4">Add events to view them here</h3>
      </div>
      <div v-else>
        <ul class="d-flex flex-wrap list-unstyled mt-4">
            <li v-for="event in events" :key="event.key" class="col-3 mb-5 position-relative">
              <router-link :to="{ name: 'EventDetail', params: { id: event.key }}"  class="text-decoration-none">
              <div class="card" style="width: 20rem;">
                <img class="card-img-top" :src="event.eventimage" alt="Card image cap" height="200">
                <div class="card-body">
                  <h5 class="card-title text-dark font-weight-bold font-italic mb-0">{{event.title}}</h5>
                  <span class="badge badge-dark date-badge">{{moment(event.eventstart).format('MMM D, YYYY')}}</span>
                </div>
              </div>
              </router-link>
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners'
import { eventsCollection } from '../Firebase'

export default {
  name: 'ViewEvent',
  components: {
    AtomSpinner
  },
  data () {
    return {
      loading: true,
      events: [],
      errors: [],
      eventsRef: eventsCollection,
    }
  },
  created () {
    this.eventsRef.get().then((querySnapshot) => {
      this.events = [];
      querySnapshot.forEach((doc) => {
        this.loading = false
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
        alert("Error getting events: ", error);
    });
    this.loading = true
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
  .loader{
    margin: auto
  }
</style>
