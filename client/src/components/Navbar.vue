<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="a" href="https://shitcloud.io">
				<h4 class="title is-4">
					<b-icon
						icon="apps"
						size="is-small">
					</b-icon>
				</h4>
            </b-navbar-item>
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<h4 class="title is-4">
					Todo
				</h4>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
	
};
</script>