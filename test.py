from imageProcess import generate

# from imaginairy import (
#     imagine,
#     imagine_image_files,
#     ImaginePrompt,
#     WeightedPrompt,
#     LazyLoadingImage,
# )


# def generate(prompt, filename):
#     # imagine_image_files(filename, outdir="./my-art")
#     prompts = [
#         ImaginePrompt(
#             "make it anime",
#             init_image=LazyLoadingImage(filepath="./AaronKwokPortrait.jpeg"),
#             model="openjourney-v2"
#             # mask_prompt="fruit OR stem{*2}",  # amplify the stem mask x2
#         ),
#     ]
#     for result in imagine(prompts):
#         # do something
#         result.save("my_image.jpg")


generate("", "test345.jpg")
