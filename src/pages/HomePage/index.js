import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { invite } from '../../state/apis/invite';

import './index.css';

const GuestView = (props) => (
    <div className='guests-view'>
        <table>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.guests.map((guest, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{guest.email}</td>
                            <td>{guest.number}</td>
                            <td>
                                <button onClick={() => props.removeGuest(i)}>Remove</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div className='action-section'>
            <button onClick={props.sendInvites}>Send Invites</button>
        </div>
    </div>
);


const AddGuest = (props) => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const onAdd = () => {
        if (!!number && !!email) {
            props.onAddGuest({ number, email });
            setEmail('');
            setNumber('')
        }
    }

    return (
        <div className='add-guest-form'>
            <h4 className='add-guest-title'>Add Guests</h4>
            <input
                type='text'
                placeholder='email'
                className='guest-email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='text'
                placeholder='mobile'
                value={number}
                className='guest-number'
                onChange={(e) => setNumber(e.target.value)}
            />
            <div className='action-section'>
                <button onClick={onAdd}>
                    Add Guest
                </button>
            </div>
        </div>
    );
}

const HomePage = (props) => {
    const [guests, setGuests] = useState([]);

    const removeGuest = (guestIndex) => {
        const leftGuests = guests.filter((g, i) => i !== guestIndex);
        setGuests(leftGuests);
    }

    const sendInvites = () => {
        console.log('sending invitew', guests);
        const guestData = guests.map((g, i) => ({ ...g, index: i + 1 }));
        props.sendInvite(guestData);
        setGuests([]);
    }

    if (!props.isLoggedIn) {
        return (<Redirect to='/signin' />);
    }
    return (
        <div className='home-page'>
            <AddGuest
                onAddGuest={(guest) => setGuests([...guests, guest])}
            />
            {
                guests.length > 0 &&
                <GuestView
                    guests={guests}
                    removeGuest={removeGuest}
                    sendInvites={sendInvites}
                />
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: (state.user && state.user.token),
});

const mapDispatchToProps = (dispatch) => ({
    sendInvite: (data) => dispatch(invite(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);