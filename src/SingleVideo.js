import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDefaultContext } from './content/DefaultContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SortIcon from '@mui/icons-material/Sort';
import Dropdown from 'react-bootstrap/Dropdown';
import { Start } from '@mui/icons-material';


const SingleVideo = () => {
    const apiKey = "AIzaSyBSss1seVF8vXxYeTHBamdwfDcHTOSXWMI"
    const [vidData, setVidData] = useState();
    const [comments, setComments] = useState();
    const [recommendations, setRecommendations] = useState();
    const { sidebarDis, setSidebarDis } = useDefaultContext();
    const {mainUser} = useDefaultContext();
    const { video_id } = useParams();
    const getVideo = async () => {
        console.log(video_id, "vidid")
        let res
        res = await axios.get("http://localhost/watchvideo.php?id=" + video_id);
        console.log(res, "res")
        if (res.data) {
            setVidData(res.data.data)
            console.log(res.data.data, "viddata")
            getComments("relevance")
            history()
            let titles
            titles = res.data.data.title.split(" ")
            let searchQuery = titles[Math.floor(Math.random() * titles.length)].toLowerCase()
            for (let x = 0; x < 15 && (!searchQuery || searchQuery.length < 4); x++) {
                searchQuery = titles[Math.floor(Math.random() * titles.length)].toLowerCase();
            }
            getRecommendations(res.data.data.category,searchQuery)
        }
    }
    const getComments = async (sortby) => {
        setComments(null)
        let res = {}
        try {
            res = await axios.get("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=" + video_id + "&key=" + apiKey + "&maxResults=50&order=" + sortby);
            console.log(res, 'comments')
        } catch {

        }

        if (res.data && res.data.items) {
            setComments(res.data.items)
        }

    }
    const history =async ()=>{
        if(mainUser ){
            console.log(mainUser,"main user")
        const res = await axios.get("http://localhost/updatehistory.php?videoId="+video_id+"&userEmail=" + mainUser ) 
        }      
    }
    const getRecommendations = async (y,z) => {
        console.log(y,z,"api")
        const response = await axios.get("http://localhost/getsearchvideos.php?que=" + y +"&srch="+z)
        console.log("srchrecommed", response.data)
        setRecommendations(response.data)

    }
    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
        getVideo()
    }, [video_id])
    useEffect(() =>
        setSidebarDis(false)
        , [setSidebarDis])
    const timeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const units = [
            { name: "year", seconds: 31536000 },
            { name: "month", seconds: 2592000 },
            { name: "week", seconds: 604800 },
            { name: "day", seconds: 86400 },
            { name: "hour", seconds: 3600 },
            { name: "minute", seconds: 60 },
            { name: "second", seconds: 1 },
        ];

        for (let unit of units) {
            const value = Math.floor(diffInSeconds / unit.seconds);
            if (value >= 1) {
                return new Intl.RelativeTimeFormat("en", { numeric: "auto" })
                    .format(-value, unit.name);
            }
        }

        return "just now";
    }

    return (

        <div className='d-flex w-100 mt-4'>
            <div className='mainSingleVideo d-flex flex-column justify-content-center ps-5'>
                <iframe
                    id='mainVideo'
                    className='singleVideo rounded-4 '
                    height="450"
                    src={`https://www.youtube.com/embed/${video_id}?autoplay=1`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                {vidData ?
                    <div className='mt-lg-2'>
                        <h5 className='fw-bold'>{vidData.title}</h5>
                        <article className='d-flex align-items-center flex-wrap'>
                            <div className='d-flex w-lg-25 mx-auto ms-0'>
                                <div className='d-flex'>
                                    <Avatar />
                                </div>
                                <div>
                                    <h6 className='ms-2'>{vidData.channel_title}</h6>
                                </div>
                                <Button className="bg-dark h-75 rounded-pill border-0 ms-2 ">Subscribe</Button>
                            </div >
                            <div className=' d-flex justify-content-evenly'>
                                <ButtonGroup className='my-sm-2 ms-lg-2 ms-md-2 '>
                                    <Button className='bg-secondary-subtle rounded-start-pill  px-2' variant='d-flex justify-content-center'><ThumbUpOutlinedIcon />{vidData ? vidData.like_count : 0}</Button>
                                    <Button className='bg-secondary-subtle rounded-end-pill px-2' variant='rounded-end-pill'><ThumbDownOffAltOutlinedIcon /></Button>
                                </ButtonGroup>
                                <Button className='bg-secondary-subtle rounded-pill border-0 text-dark mx-sm-2 my-sm-2 '><ReplyOutlinedIcon />Share</Button>
                                <Button className='bg-secondary-subtle rounded-pill border-0 text-dark mx-sm-2 my-sm-2 '><BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>Save</Button>
                                <Button className='bg-secondary-subtle rounded-pill border-0 text-dark mx-sm-2 my-sm-2 '><FileDownloadOutlinedIcon />Download</Button>
                                <Button className='bg-secondary-subtle rounded-pill border-0 text-dark mx-sm-2 my-sm-2  fw-bold'><MoreHorizOutlinedIcon /></Button>
                            </div>
                        </article>
                        <article className='bg-secondary-subtle px-2 py-1 rounded-3 mb-5'>
                            <h6>{vidData ? vidData.view_count : 0} views • {formatDate(vidData.created_at)}</h6>
                            <p className='mb-0 singleVideoDescription' >{vidData.description}</p>
                        </article>
                    </div>
                    : null}
                <section className='rounded-3 px-2 py-1'>
                    {vidData ?
                        <div className='d-flex'>
                            <h4 className='fw-bold'>{comments ? comments.length : 0} Comments</h4>
                            <Dropdown className='d-flex ms-2 border-0 align-items-start'>
                                <Dropdown.Toggle variant='white' id="dropdown-basic bg-white d-flex mb-2">
                                    <span className='ms-1 fw-medium'><SortIcon />Sort By</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className='' onClick={() => (getComments("relevance"))}>Top</Dropdown.Item>
                                    <Dropdown.Item className='' onClick={() => (getComments("time"))}>Latest</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div> : null}

                    {comments && comments.length > 0 && (
                        comments.map((item) => {
                            const topComment = item.snippet.topLevelComment.snippet;
                            const replies = item.replies?.comments || [];

                            return (
                                <article key={item.id} className="d-flex mb-2">
                                    <Avatar src={topComment.authorProfileImageUrl} />

                                    <div className="ms-2 w-100">
                                        <div className="d-flex align-items-center">
                                            <span className="fw-semibold">
                                                {topComment.authorDisplayName}
                                            </span>
                                            <span className="ms-2 text-muted" style={{ fontSize: 13 }}>
                                                {timeAgo(topComment.publishedAt)}
                                            </span>
                                        </div>
                                        <p
                                            className="mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: topComment.textDisplay,
                                            }}
                                        />
                                        <ButtonGroup className='m-0'>
                                            <Button className='rounded-start-pill d-flex align-items-center fw-semibold  px-2' variant='d-flex justify-content-center'><ThumbUpOutlinedIcon />{item.snippet.topLevelComment.snippet.likeCount}</Button>
                                            <Button className='rounded-end-pill px-2' variant='rounded-end-pill'><ThumbDownOffAltOutlinedIcon /></Button>
                                        </ButtonGroup>
                                        {replies.length > 0 && (
                                            <div className="ms-4 mt-1">
                                                {replies.map((reply) => (
                                                    <div key={reply.id} className="d-flex mb-1 align-items-center">

                                                        <Avatar
                                                            src={reply.snippet.authorProfileImageUrl} sx={{ width: 28, height: 28 }}
                                                        />

                                                        <div className="ms-2">
                                                            <div className="d-flex align-items-center">
                                                                <span className="fw-semibold">
                                                                    {reply.snippet.authorDisplayName}
                                                                </span>
                                                                <span className="ms-2 text-muted" style={{ fontSize: 12 }}>
                                                                    {timeAgo(reply.snippet.publishedAt)}
                                                                </span>
                                                            </div>

                                                            <p
                                                                className="mb-0"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: reply.snippet.textDisplay,
                                                                }}
                                                            />
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                </article>
                            );
                        })
                    )}

                </section>

            </div>
            <div className='sideSingleVideo vh-100'>
                {recommendations && recommendations.length > 0 ?
                    (recommendations.map((i, e) =>
                        <Link to={'/watch/v/' + (i.video_id)} className='text-decoration-none text-dark'>
                            <div className='recommend w-100 d-flex rounded-3 my-2' >
                                <img className='recommendImg rounded-3' src={i.thumbnail_url} />
                                <div className='ps-1'>
                                    <p className='fw-semibold mb-0'>{i.title.slice(0, 50)}..</p>
                                    <p className='mb-0'>{i.channel_title}</p>
                                    <p className='mt-0'>{timeAgo(i.published_at)}</p>
                                </div>
                            </div>
                        </Link>
                    ))

                    : <div>
                        <h5 className='text-secondary mt-5'>No recommendations Found</h5>
                    </div>}
            </div>


        </div >
    )
}

export default SingleVideo