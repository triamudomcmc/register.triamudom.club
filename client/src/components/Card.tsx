export const Card = ({ children, ...restProps }) => (
  <div className="shadow p-8 bg-white rounded" {...restProps}>
    {children}
  </div>
)
