
const Status = ({ status }) => {
  return (
    <div className={`status-container`}>
      <span className={`status ${status || 'pending'}`}>
        {status || "Pending"}
      </span>
    </div>
  )
}

export default Status
