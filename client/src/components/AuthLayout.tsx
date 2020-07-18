import React from 'react'
import { Card } from './Card'

export const AuthLayout = ({ title, children }) => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="max-w-lg font-display">
      <div>
        <img src="/assets/logo/logo.png" className="w-64 mx-auto"></img>
      </div>
      <Card>
        <h1 className="text-lg font-bold">{title}</h1>
        <div>{children}</div>
      </Card>
    </div>
  </div>
)
