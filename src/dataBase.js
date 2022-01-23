import im from './assets/img/event-img.png'

export const ArrPosts = {
  data () {
    return {
      posts: [
        {
          id: 1,
          image: im,
          EventName: 'День народження',
          TypeOfEvent: '',
          realData: '',
          realTime: '',
          workers: [],
          num: [1, 1, 1, 1, 1, 1, 1, 1],
          PersonSalary: [],
          selectedCurrency: '',
          EventBudget: '',
          EventCity: '',
          EventLocationArea: '',
          EventLocationType: '',
          EventNumberGuests: '',
          EventAboutInfo: ''
        },
        {
          id: 2,
          image: im,
          EventName: 'Весілля',
          TypeOfEvent: '',
          realData: '',
          realTime: '',
          workers: [],
          num: [1, 1, 1, 1, 1, 1, 1, 1],
          PersonSalary: [],
          selectedCurrency: '',
          EventBudget: '',
          EventCity: '',
          EventLocationArea: '',
          EventLocationType: '',
          EventNumberGuests: '',
          EventAboutInfo: ''
        }
      ]
    }
  }
}
