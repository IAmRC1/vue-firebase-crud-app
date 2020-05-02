<template>
    <div>
      <div class="d-flex justify-content-between px-3">
        <h2>
          All Events
        </h2>
        <button v-if="!loading && events && events.length > 0" class="btn btn-danger" @click="delallevt()">
          <ion-icon name="trash-outline" /> Delete All
        </button>
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
            <li v-for="event in events" :key="event.key" class="col-3 mb-5 position-relative">
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
    this.eventsRef.get().then((querySnapshot) => {
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
  },
  methods: {
    delevt: function(id){
      this.eventsRef.doc(id).delete().then(() => console.log('Event deleted'))
      .catch(error => console.log(error))
    },
    delallevt: function(){
      if(confirm("Click OK to delete ALL the events")){
        this.eventsRef
        .get().then(res => {
          res.forEach(element => {
            element.ref.delete();
          });
        })
        .catch(error => console.log('error', error))
      }
      
    } 
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
