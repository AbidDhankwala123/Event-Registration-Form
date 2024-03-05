import React from 'react'
import styles from "./Success.module.css"

const Success = ({ eventId, eventName, eventEmail, eventMobile, selectedEvent }) => {
    return (
        <div className={styles.success_container}>
            <div className={styles.inner_success_container}>
                <h2 className={styles.heading}>You are Registered Successfully for an Event</h2>
                <div>
                    <div>
                        <label htmlFor="id" className={styles.success_id}>Id</label>
                        <span>{eventId}</span>
                    </div>
                    <div>
                        <label htmlFor="name" className={styles.success_name}>Name</label>
                        <span>{eventName}</span>
                    </div>
                    <div>
                        <label htmlFor="email" className={styles.success_email}>Email</label>
                        <span>{eventEmail}</span>
                    </div>
                    <div>
                        <label htmlFor="mobile" className={styles.success_mobile}>Mobile</label>
                        <span>{eventMobile}</span>
                    </div>
                    <div>
                        <label htmlFor="EventSessions" className={styles.success_eventSession}>Event Session</label>
                        <span>{selectedEvent}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Success
