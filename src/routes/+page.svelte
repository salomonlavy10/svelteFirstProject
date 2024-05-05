<script lang="ts">
  import { onMount } from 'svelte';
  import { get, post } from './api/api.js';

  let messages: { content: string, created_at: string }[] = [];
  let newMessage: string = "";
  let isLoading: boolean = false;
  let errorMessage: string = "";

  onMount(async () => {
      await refreshMessages();
  });

  async function refreshMessages() {
    isLoading = true;
    errorMessage = "";
    const response = await get();
    if (response.ok) {
        const data = await response.json();
        messages = data;
    } else {
        errorMessage = "Failed to fetch messages.";
        console.error(errorMessage);
    }
    isLoading = false;
  }

  async function sendMessage() {
    if (newMessage.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }
    isLoading = true;
    errorMessage = "";
    const response = await post(newMessage);
    if (response.ok) {
      newMessage = "";  // Clear the input field
      await refreshMessages();  // Refresh the list of messages
    } else {
      errorMessage = "Failed to send message.";
      console.error(errorMessage);
    }
    isLoading = false;
  }
</script>


<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
  button, input {
    background-color: white;
    margin-bottom: 3rem;
    border-radius: 15px;
    border: 2px black solid;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  input {
    border-radius: 0px;
    border: 2px black solid;
    padding: 10px 32px;

  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 3rem;
  }
  th, td {
    border: 1px solid black;
    padding: 0.5rem;
    text-align: left;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
</style>

<main>
  <h1>Chat Room</h1>
  {#if isLoading}
    <p>Loading...</p>
  {/if}
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  <table>
    <thead>
      <tr>
        <th>Message</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      {#each messages as message}
      <tr>
        <td>{message.content}</td>
        <td>{new Date(message.created_at).toLocaleString()}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  <input bind:value={newMessage} placeholder="Type a message" />
  <button on:click={sendMessage} disabled={isLoading}>Send 🇵🇦</button>
</main>
