
import Map from './Map'

function GlobalView({listings}) {



  return (
    <div>
      <Map coordinates={listings.map(listing => listing.coordinates
        )}/>
    </div>
  )




}


export default GlobalView