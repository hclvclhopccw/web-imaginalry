from imaginairy import (
    imagine,
    imagine_image_files,
    ImaginePrompt,
    WeightedPrompt,
    LazyLoadingImage,
)


def generate(style, inputFilename, outFilename):
    prompts = []
    if style == "anime":
        prompts = [
            ImaginePrompt(
                "make it anime",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                model="openjourney-v4",
                steps=20,
            )
        ]
    elif style == "3d":
        prompts = [
            ImaginePrompt(
                "make it pixar style",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                model="edit",
                fix_faces=True,
                prompt_strength=20,
                steps=20,
            )
        ]
    elif style == "pixel":
        prompts = [
            ImaginePrompt(
                "make it pixel",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                model="openjourney-v4",
                prompt_strength=12,
                steps=20,
            )
        ]
    elif style == "smile":
        prompts = [
            ImaginePrompt(
                "a couple smiling",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                mask_prompt="face",
                mask_mode="replace",
                init_image_strength=0.2,
                steps=20,
                fix_faces=True,
            )
        ]
    elif style == "old":
        prompts = [
            ImaginePrompt(
                "make the person older",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                mask_prompt="head|face",
                mask_mode="replace",
                model="edit",
                init_image_strength=0.2,
                steps=20,
            )
        ]

    for result in imagine(prompts):
        result.save(f"./frontend/public/img/{style}/{outFilename}")
