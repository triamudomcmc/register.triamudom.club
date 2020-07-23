export const Card = ({ children, ...restProps }) => (
  <div className="shadow-lg p-8 bg-white rounded-md" {...restProps}>
    {children}
  </div>
)
