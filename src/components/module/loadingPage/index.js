import react from 'react'
import { Spin } from 'antd'
import './style.scss'
function LoadingPage() {
    return (
        <div className="page-loader loader-full">
            <Spin size="large" delay="200"></Spin>
        </div>
    )
}
export default LoadingPage