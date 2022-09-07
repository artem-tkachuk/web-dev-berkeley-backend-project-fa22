1. All gifts are distinct in the API call
2. Gift list never changes (confirmed by the GitHub repo)
3. All runner names are unique. Otherwise we need some sort of identification or number to distinguish between two "Artem"s.
4. We don't need to save spectator's name, the one who gave the gift
5. Data comes in the body of an http request, in a simple json format