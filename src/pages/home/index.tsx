import React, { memo } from 'react'
import styles from './index.less'

export interface HomeProps { }

const Home: React.FC<HomeProps> = memo(() => (
    <div className={styles['home']}>
        Welcome
    </div>
))

export default Home
