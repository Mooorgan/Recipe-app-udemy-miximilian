import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map, Subscription } from 'rxjs';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  private storeSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== undefined;
      // console.log(this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const arr: FormGroup[] = [];
    let recipeIngredients = new FormArray(arr);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store
        .select('recipes', 'recipes')
        .pipe(
          map((recipe) => {
            return recipe.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          console.log('From inside Subscribe');
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, [Validators.required]),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    console.log('From outside Subscribe');

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }

  getcontrols() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients
    // );
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this.id,
          newRecipe: this.recipeForm.value,
        })
      );
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
      console.log(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  OnCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredients(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy(): void {
    this.storeSub && this.storeSub.unsubscribe();
  }
}
