import React, { FC } from 'react'

import Search from '@/components/layout/header/Search/Search'

import styles from './Header.module.scss'
import logoImg from './vk-logo.png'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles['image-wrapper']}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={logoImg.src} alt='' />
			</div>
			<Search />
		</header>
	)
}

export default Header
