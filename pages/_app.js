import "bootstrap/dist/css/bootstrap.css";
import '../styles/globals.css'
import { client as faunadbClient, q } from '../config/db'
import { data as staticData } from '../data/data.js'

function MyApp({ Component, pageProps }) {

  loadFaunadbData();

  return <Component {...pageProps} />
}

export default MyApp

function loadFaunadbData() {
  faunadbClient
    .query(
      q.Paginate(
        q.Match(
          q.Ref('indexes/houses')))
    )
    .then((response) => {
      
      const refs = response.data;
      
      const getAllDataQuery = refs.map((ref) => {
        return q.Get(ref);
      });
      // query the refs
      return faunadbClient.query(getAllDataQuery).then((data) => {
        if (data.length == 0) {
          importStaticDataIntoFaunaDB(faunadbClient)
          .then((ret) => console.log(ret))
        }
      });
    })
    .catch((error) => console.log('error: ', error.message));
}

function importStaticDataIntoFaunaDB(faunadbClient) {
  return faunadbClient.query(
    q.Map(
      staticData,
      q.Lambda(
        'house',
        q.Create(
          q.Collection('houses'),
          { data: q.Var('house') }
        )
      )
    )
  );
}

