function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      color="#dadada"
      strokeWidth={2}
      stroke="#ff977e"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      width={32}
      height={32}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={12} cy={12} r={11} />
      <path d="M16 8l-8 8m0-8l8 8" />
    </svg>
  )
}

export default CloseIcon
