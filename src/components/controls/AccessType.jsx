
const AccessType = ({ type }) => {
  return (
    <div className={`access-type ${type === 'admin' ? 'type-admin' : 'type-user'}`}>
      {type}
    </div>
  )
}
export default AccessType;