import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import HomeIcon from '@mui/icons-material/Home';
import { FeedbackOutlined, HelpOutlineOutlined, Home } from '@mui/icons-material';
import BoltIcon from '@mui/icons-material/Bolt';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import { useDefaultContext } from "./content/DefaultContext";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { mainUser, setSearchResults } = useDefaultContext();
    const history = async () => {
        if (mainUser != undefined) {
            const res = await axios.get("http://localhost/gethistory.php?user=" + mainUser)
            console.log(res.data, "history")
            setSearchResults(res.data)
        }
    }

    return (
        <div className="d-flex flex-column p-3 position-fixed px-0 sidebar"
            style={{ width: "18%", overflowY: "auto", height: "91vh", top: "3rem" }}>
            <Link to={"/"} className='text-decoration-none text-dark'><div className='nav-item' > <HomeIcon fontSize='medium' /><span className='fw-medium'>Home</span></div></Link>
            <div className='nav-item'> <BoltIcon fontSize='medium' /><span>Shorts</span></div>
            <div className='nav-item'> <SubscriptionsOutlinedIcon fontSize='medium' /><span>Subscriptions</span></div>
            <div className='nav-item'> <AccountCircleOutlinedIcon fontSize='medium' /><span>You</span></div>
            <div className='nav-item' onClick={history}> <HistoryOutlinedIcon fontSize='medium' /><span>History</span></div>
            <hr></hr>
            <div className='nav-item ms-4'>Sign in to like videos, comment and subscribe.</div>
            <Button variant="outline-primary" className='rounded-pill mt-2  w-lg-50 ms-4' size="sm">
                <AccountCircleSharpIcon></AccountCircleSharpIcon> Sign in
            </Button>
            <hr />
            <span className='ms-3 fw-semibold' style={{ fontSize: '16px' }}>More from YouTube</span>
            <div className='nav-item'> <YouTubeIcon fontSize='medium' color="error" /><span>YouTube premium</span></div>
            <div className='nav-item'> <MusicNoteIcon fontSize='medium' color='error' /><span>YouTube music</span></div>
            <div className='nav-item'> <YouTubeIcon fontSize='medium' color='error' /><span>YouTube kids</span></div>
            <hr />
            <div className='nav-item'> <SettingsSuggestRoundedIcon fontSize='medium' /><span>Settings</span></div>
            <div className='nav-item'> <OutlinedFlagRoundedIcon fontSize='medium' /><span>Report history</span></div>
            <div className='nav-item'> <HelpOutlineOutlined fontSize='medium' /><span>Help</span></div>
            <div className='nav-item'> <FeedbackOutlined fontSize='medium' /><span>Send feedback</span></div>
        </div>
    )
}

export default Sidebar