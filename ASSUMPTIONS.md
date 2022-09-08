# Assumptions

Here are some of the assumptions I made when developing this API: 

1. All gifts are distinct in the API call
2. Gift list never changes (confirmed by the clarification in the GitHub repo)
3. All runner names are unique. Otherwise, we would need some sort of identification or number to distinguish between two "Artem"s, for example.
4. We don't need to save spectator's name (the one who gave the gift)
5. Data comes in the body of an http request, in a simple json format. No www-form-urlencoded or something like this
6. A tester is able to run my project!!!  Very important, hahaha
