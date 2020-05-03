<template>
  <div>
    <div class="d-flex justify-content-between px-3">
      <h2>
        All Events
      </h2>
      <div class="d-flex">
        <button v-if="!loading && !nodata && events && events.length > 1" class="btn btn-danger mr-3 d-flex align-items-center" @click="delallevt()">
          <ion-icon name="trash-outline" />Delete All
        </button>
        <div class="dropdown">
          <button v-if="!loading && !nodata && events && events.length > 1" class="btn btn-info dropdown-toggle py-2" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sorting
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
            <button class="dropdown-item" @click="sortnameasc()">Name (A-Z)</button>
            <button class="dropdown-item" @click="sortnamedesc()">Name (Z-A)</button>
            <button class="dropdown-item" @click="sortdatedesc()">Date (Farthest First)</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loader">
      <atom-spinner
        :animation-duration="1500"
        :size="100"
        :color="'#ff1d5e'"
      />
    </div>
    <div v-if="nodata">
      <img src="../assets/no_data_found.png"  style="400px; height: 400px" >
      <p class="mt-3">Oh Snap! No events found. Add some to view them here.</p>
      <router-link to="/addevent" class="btn btn-primary">Add Event</router-link>
    </div>
    <div v-else>
      <ul class="d-flex flex-wrap list-unstyled mt-4">
          <li v-for="(event, i) in events" :key="i" class="col-lg-3 col-sm-6 col-xs-12 mb-5 position-relative">
            <button class="btn delete" @click="delevt(event.key)">
              <ion-icon name="close-outline" />
            </button>
            <router-link :to="{ name: 'EventDetail', params: { id: event.key }}"  class="text-decoration-none">
            <div class="card" style="width: 20rem;">
              <img v-if="event.eventimage" class="card-img-top" :src="event.eventimage" alt="Card image cap" height="200">
              <img v-else class="card-img-top" src="../assets/no_event_image.png" alt="Card image cap" height="200">
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
      loading: false,
      nodata: false,
      events: [],
      errors: [],
      eventsRef: eventsCollection,
    }
  },
  created () {
    this.loading = true
    this.eventsRef
    .orderBy('eventstart')
    .onSnapshot((querySnapshot) => {
      if(querySnapshot.empty){
        this.loading = false
        return this.nodata = true
      }
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, '=>', doc.data())
        this.loading = false
        this.nodata = false
        this.events.push({
          key: doc.id,
          ...doc.data()
        });
      });
    })
  },
  methods: {
    delevt: function(id){
      this.events = [];
      this.eventsRef.doc(id).delete()
      //.then(() => console.log('Event deleted'))
      .catch(error => console.log(error))
    },
    delallevt: function() {
      if(confirm("Click OK to delete ALL the events")){
      this.eventsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc)=> {
          let key = doc.id
          this.eventsRef.doc(key).delete()
          });
        });
      }
      this.nodata=true;
    },
    sortnamedesc: function() {
      this.events = [];
      this.eventsRef.orderBy('title','desc').onSnapshot(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.events.push({
            key: doc.id,
            ...doc.data()
          });
        });
      })
    },
    sortnameasc: function() {
      this.events = [];
      this.eventsRef.orderBy('title').onSnapshot(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.events.push({
            key: doc.id,
            ...doc.data()
          });
        });
      })
    },
    sortdatedesc: function() {
      this.events = [];
      this.eventsRef.orderBy('eventstart', 'desc').onSnapshot(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.events.push({
            key: doc.id,
            ...doc.data()
          });
        });
      })
    },
  }
}
</script>

<style scoped>
  .card{
    transition: all 0.3s ease-in;
  }
  /* .card:hover {
    transform: rotateZ(2deg);
    transition: all 0.3s ease-in;
  } */
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
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .delete{
    position: absolute;
    font-size: 15px;
    background-color: #333;
    color: #fff;
    border-radius: 0.25rem;
    z-index: 9999;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .delete:hover{
    color: #fff;
    background-color: red;
  }
</style>
