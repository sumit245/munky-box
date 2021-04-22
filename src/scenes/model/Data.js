
import axios from 'axios';

const restaurant = async () => {
  const rest = await axios.get('http://192.168.1.4:5000/api/newrest')
  return rest;
}

export const Data = restaurant()


export const DATA = [
  {
    foodname: 'Crock Pot Roast',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    foodDescription: '2 breads, lentils, sucage',
    title: 'Kake di Hatti',
    type: 'nonveg',
    url:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&w=1000&q=80',
    distance: '1.5km',
    rating: '3',
    description: 'Best Punjabi Food in the world',
    chef: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    plan: {
      "basic": {
        "time": "2 Days",
        "amount": "$5 per meal"
      },
      "standard": {
        "time": "15 Days",
        "amount": "$4 per meal"
      },
      "premium": {
        "time": "30 Days",
        "amount": "$3 per meal"
      }
    }
  },
  {
    foodname: 'Roasted Asparagus',
    foodDescription: 'Roasted Asparagus, lentils, chilli sauce, pepper fry',
    type: 'veg',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Dominos',
    url:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&w=1000&q=80',
    price: '$10',
    distance: '1.5km',
    rating: '3.5',
    description: 'Our burgers are best in world',
    chef: 'https://images.unsplash.com/flagged/photo-1561350117-501b4661f8d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    plan: {
      "basic": {
        "time": "2 Days",
        "amount": "$5 per meal"
      },
      "standard": {
        "time": "15 Days",
        "amount": "$4 per meal"
      },
      "premium": {
        "time": "30 Days",
        "amount": "$3 per meal"
      }
    }
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    foodname: 'Curried Lentils and Rice',
    foodDescription: '200g Brown Rice, lentils, chilli sauce, pickle',
    type: 'veg',
    title: 'McDonalds',
    url:
      'https://i.insider.com/5e3ae6c45bc79c5b56620e97?width=1100&format=jpeg&auto=webp',
    price: '$5',
    distance: '1.5km',
    rating: '4',
    description: 'Best Fries',
    chef: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    plan: {
      "basic": {
        "time": "2 Days",
        "amount": "$5 per meal"
      },
      "standard": {
        "time": "15 Days",
        "amount": "$4 per meal"
      },
      "premium": {
        "time": "30 Days",
        "amount": "$3 per meal"
      }
    }
  },

  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Kitchen King',
    foodname: 'Big Night Pizza',
    foodDescription: '1 Full size Pizza, Pepsi 500 ml, pepper',
    type: 'veg',
    url:
      'https://media-cdn.tripadvisor.com/media/photo-s/0a/ae/6c/f0/kitchen-king.jpg',
    price: '$7.5',
    distance: '1.5km',
    rating: '3.8',
    description: 'Non veg food',
    chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    plan: {
      "basic": {
        "time": "2 Days",
        "amount": "$ 5 per meal"
      },
      "standard": {
        "time": "15 Days",
        "amount": "$4 per meal"
      },
      "premium": {
        "time": "30 Days",
        "amount": "$ 3 per meal"
      }
    }
  },
];

