import React from 'react'
import { Card } from './Card'

export const AuthLayout = ({ title, children }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm font-display">
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
