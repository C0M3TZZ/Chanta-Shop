<script>
  let password = "chantashopadmin";
  let form = {
    "password" : null
  }
  let login = false;
  let loginForm = () => {
    if (form.password == password) {
      login = true;
    }
  }
</script>

<div class="container flex justify-center items-center mx-auto h-1/2">
  {#if !login}
    <div class="card w-96 bg-base-200">
      <div class="card-body">
        <h2 class="card-title">Login</h2>
        <input type="password" placeholder="Password" bind:value={form.password} class="input input-bordered input-primary w-full max-w-xs" />
        <div class="card-actions justify-end">
          <button class="btn btn-primary" on:click={()=>{loginForm()}}>Login</button>
        </div>
      </div>
    </div>
  {/if}
</div>
