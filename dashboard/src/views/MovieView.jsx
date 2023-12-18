import React, {useState, useEffect} from 'react';
import Card from '../components/RowMovies/Card/Card';
import { useParams } from 'react-router-dom';
function MovieView() {
    const {title} = useParams();
    const [movie, setMovie]= useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMovie() {
            const result = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=f441bd5c`);
            const data = await result.json();
        };
        getMovie()
    }, []);


    return (
        <Card title={movie?.Title}>
            <div className="text-center">
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '40rem' }} src='' alt=" Star Wars - Mandalorian " />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
            <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
        </Card>
    );
};
export default MovieView;