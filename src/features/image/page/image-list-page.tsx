import { ImageCreateButtonComponent } from "#/features/image/component/image-create-button-component";
import { ImageListComponent } from "#/features/image/component/image-list-component";

export function ImageListPage({ page }: { page: string }) {
	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-xl">图片列表</h1>
			</div>
			<ImageCreateButtonComponent />
			<ImageListComponent page={Number(page)} />
		</>
	);
}
