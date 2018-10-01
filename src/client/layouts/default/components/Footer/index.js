import React from 'react'
import './footer.scss'

export default class Footer extends React.Component {
	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<footer className="footer">
				<div className="container">
					<div className="row">
						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 footer__col _logo">
							<a href="https://www.apination.com" className="footer__logo" />
							<div className="footer__copy">
								Copyright &copy; {new Date().getFullYear()} Apination
								<sup>ТМ</sup>
							</div>
						</div>
						<div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-4 footer__col _nav">
							<nav className="footer__nav">
								<a
									href="https://my.apination.com/workflows/"
									className="footer__nav__item"
								>
									WORKFLOWS
								</a>
								<a
									href="https://my.apination.com/apps/"
									className="footer__nav__item"
								>
									APPS
								</a>
								<a
									href="https://www.apination.com/privacy-policy/"
									className="footer__nav__item"
								>
									Privacy policy
								</a>
								<a
									href="https://www.apination.com/terms/"
									className="footer__nav__item"
								>
									Terms of use
								</a>
							</nav>
						</div>
						<div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-4 footer__col _nav">
							<nav className="footer__nav">
								<a
									href="https://www.apination.com/company/"
									className="footer__nav__item"
								>
									COMPANY
								</a>
								<a
									href="https://www.apination.com/company/"
									className="footer__nav__item"
								>
									About Apination
								</a>
								<a
									href="https://www.apination.com/jobs-careers/"
									className="footer__nav__item"
								>
									Career at Apination
								</a>
							</nav>
						</div>
						<div className="col-xl-1 col-lg-2 col-md-2 col-sm-6 col-4 footer__col _nav">
							<nav className="footer__nav">
								<a
									href="https://www.apination.com/blog/"
									className="footer__nav__item"
								>
									BLOG
								</a>
								<a
									href="https://www.apination.com/contact/"
									className="d-none d-xs-block d-mg-block footer__nav__item"
								>
									CONTACT
								</a>
							</nav>
						</div>
						<div className="col-xl-1 col-lg-1 d-none d-lg-block footer__col _nav">
							<nav className="footer__nav">
								<a
									href="https://www.apination.com/contact/"
									className="footer__nav__item"
								>
									CONTACT
								</a>
							</nav>
						</div>
					</div>
				</div>
			</footer>
		)
	}
}
