import "@/site/components/controls/controls.css"

const ButtonPrimary = ({ isLink = false, to = "/", isWhite = false, type = 'button', children, submitBtnClass = "", ...props }) => {
  return (
    isLink ? (
      <a href={to} className={`button-primary ${submitBtnClass} ${isWhite && 'btn-white'}`} {...props}>
        <span className={`${submitBtnClass}`}>{children}</span>
      </a>
    ) : (
      <button type={type} className={`button-primary ${submitBtnClass} ${isWhite && 'btn-white'}`} {...props}>
        <span className={`${submitBtnClass}`}>{children}</span>
      </button>
    )
  );
}

export default ButtonPrimary;
