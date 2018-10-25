import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoaderSpinner = () => (
	<Dimmer active inverted>
		<Loader size='massive'>Loading</Loader>
	</Dimmer>
)

export default LoaderSpinner