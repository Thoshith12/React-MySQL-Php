import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useDefaultContext } from './content/DefaultContext';
import DeleteIcon from '@mui/icons-material/Delete';

const Homepage = () => {
    const apiKey = "AIzaSyBSss1seVF8vXxYeTHBamdwfDcHTOSXWMI"
    const [homeVid, setHomeVid] = useState([]);
    const { sidebarDis, setSidebarDis, mainUser } = useDefaultContext();;
    const getrecommend = async () => {
        const res = await axios.get("http://localhost/getvideos.php");
        if (res.data) {
            setHomeVid(res.data);
            console.log(res.data)
        }
    };
    const timeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date; // difference in milliseconds

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return years === 1 ? '1 year ago' : `${years} years ago`;
        if (months > 0) return months === 1 ? '1 month ago' : `${months} months ago`;
        if (weeks > 0) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        if (days > 0) return days === 1 ? '1 day ago' : `${days} days ago`;
        if (hours > 0) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        if (minutes > 0) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        return seconds <= 1 ? 'just now' : `${seconds} seconds ago`;
    };
    const getRelated = async (val) => {
        // setHomeVid([]);
        console.log(val)
        if (val == "All") {
            getrecommend();
        } else {
            const response = await axios.get("http://localhost/getsearchvideos.php?srch=" + val)
            if (response && response.data) {
                console.log(response.data, "related srch")
                setHomeVid(response.data)
            }
        }
    }

    const deleteHistory = async (id) => {
        const response = await axios.get("http://localhost/deletehistory.php?user=" + mainUser + "&video_id=" + id)
        if (response) {
            setSearchResults(response.data.data)
        }
    }


    useEffect(() => {
        getrecommend();
    }, []);
    useEffect(() =>
        setSidebarDis(true)
        , [setSidebarDis])
    const { searchResults, setSearchResults } = useDefaultContext();

    useEffect(() => {
        setHomeVid();
        window.scrollTo(0, 0);
        if (searchResults != undefined) {
            setHomeVid(searchResults)
            console.log(searchResults, "srchresults")
        } else {
            getrecommend()
        }
    }, [searchResults]);

    return (
        <div className='d-flex flex-wrap justify-content-evenly w-100 homeContent mt-4' style={{ marginLeft: "19%" }}>
            <Navbar className='w-100 d-flex justify-content-evenly'>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>All</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>Tech</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>Music</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>T-series</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>Movies</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>Cinema</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>News</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>Comedy</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>Laptops</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>Trending</Button>
                <Button onClick={(e) => getRelated(e.target.innerText)} className='bg-secondary-subtle text-dark fw-medium border-0'>VFX</Button>
            </Navbar>
            {homeVid && homeVid.length > 0 ?
                (homeVid.map((video) => (
                    <div style={{ width: '32%' }}>
                        <Link className='text-decoration-none' to={'/watch/v/' + video.video_id}>
                            <Card className='my-2 py-0' >
                                <Card.Img variant="top" className='object-fit-fill' src={video.thumbnail_url} />
                                <Card.Body>
                                    <Card.Title className='mb-1'> {(video.title ?? "").slice(0, 50)}..</Card.Title>
                                    <Card.Text className='fw-medium my-0'>{video.channel_title}  {video.view_count ? null : <span className='fw-normal'> •  {timeAgo(video.published_at)}</span>}</Card.Text>
                                    {video.view_count != null ? (
                                        <Card.Text className="my-0">
                                            <span>
                                                {
                                                    video.view_count >= 1_000_000
                                                        ? `${(video.view_count / 1_000_000).toFixed(1).replace(".0", "")}M`
                                                        : video.view_count >= 1_000
                                                            ? `${Math.floor(video.view_count / 1_000)}K`
                                                            : video.view_count
                                                } views • {timeAgo(video.published_at)}
                                            </span>
                                        </Card.Text>
                                    ) : null}
                                </Card.Body>
                            </Card>
                        </Link>
                        {video.history ? <Card.Title onClick={() => deleteHistory(video.video_id)} className=' w-75 mb-0 mx-auto text-danger'><DeleteIcon /> Delete from history</Card.Title> : null}
                    </div>
                )))
                : <>No Results Found</>}
        </div>
    )
}

export default Homepage